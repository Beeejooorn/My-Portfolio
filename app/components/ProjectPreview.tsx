import { useEffect, useRef, useState, type RefObject } from "react";
import styles from "./ProjectPreview.module.css";
import { prefersReducedMotion } from "../motion-review";

type Project = { title: string; image: string };
type Point = { x: number; y: number };
type Controller = {
  loaded: (index: number, node: HTMLImageElement) => void;
  failed: (index: number) => void;
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export function ProjectPreview({
  list,
  projects,
}: {
  list: RefObject<HTMLUListElement | null>;
  projects: readonly Project[];
}) {
  const [mounted, setMounted] = useState(false);
  const preview = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const images = useRef<(HTMLImageElement | null)[]>([]);
  const controller = useRef<Controller | null>(null);

  useEffect(() => {
    const rows = list.current;
    if (!rows) return;
    const capability = matchMedia(
      "(min-width: 901px) and (hover: hover) and (pointer: fine)",
    );
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const ready = new Set<number>();
    const animations = new Map<number, Animation>();
    let wanted = -1;
    let shown = -1;
    let generation = 0;
    let order = 1;
    let active = false;
    let hasVisual = false;
    let positioned = false;
    let requested = false;
    let frame = 0;
    let previousTime = 0;
    let exitTimer: number | undefined;
    let width = innerWidth;
    let height = innerHeight;
    let imageWidth = 360;
    let imageHeight = 250;
    let pointer: Point = { x: 0, y: 0 };
    const imagePosition: Point = { x: 0, y: 0 };
    const cursorPosition: Point = { x: 0, y: 0 };

    const cancelAnimations = () => {
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    const resetImages = () => {
      generation++;
      cancelAnimations();
      images.current.forEach((image) => {
        if (!image) return;
        image.style.opacity = "0";
        image.style.transform = "translateY(100%)";
        image.style.zIndex = "0";
      });
      hasVisual = false;
      shown = -1;
      order = 1;
    };
    const hide = () => {
      active = false;
      wanted = -1;
      rows.removeAttribute("data-preview-active");
      if (preview.current) preview.current.dataset.visible = "false";
      if (cursor.current) cursor.current.dataset.visible = "false";
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      window.clearTimeout(exitTimer);
      exitTimer = window.setTimeout(
        () => {
          resetImages();
          positioned = false;
        },
        prefersReducedMotion(preference) ? 0 : 280,
      );
    };
    const tween = (index: number, target: number) => {
      const image = images.current[index]!;
      // Sample once per project change, preserving interrupted presentation.
      const transform = getComputedStyle(image).transform;
      const start =
        transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m42;
      animations.get(index)?.cancel();
      image.style.transform = `translateY(${start}px)`;
      if (Math.abs(start - target) < 0.1) {
        image.style.transform = `translateY(${target}px)`;
        return Promise.resolve();
      }
      const animation = image.animate(
        [
          { transform: `translateY(${start}px)` },
          { transform: `translateY(${target}px)` },
        ],
        {
          duration: 260,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards",
        },
      );
      animations.set(index, animation);
      return animation.finished
        .then(() => {
          if (animations.get(index) !== animation) return;
          image.style.transform = `translateY(${target}px)`;
          animation.cancel();
          animations.delete(index);
        })
        .catch(() => {});
    };
    const showProject = () => {
      if (
        !active ||
        wanted < 0 ||
        !ready.has(wanted) ||
        !preview.current ||
        !cursor.current
      )
        return;
      if (shown !== wanted) {
        const index = wanted;
        const image = images.current[index]!;
        const id = ++generation;
        shown = index;
        if (!hasVisual || prefersReducedMotion(preference)) {
          cancelAnimations();
          images.current.forEach((node, i) => {
            if (!node) return;
            node.style.opacity = i === index ? "1" : "0";
            node.style.transform = i === index ? "none" : "translateY(100%)";
            node.style.zIndex = i === index ? "1" : "0";
          });
          hasVisual = true;
          order = 1;
        } else {
          const currentTransform = getComputedStyle(image).transform;
          const currentY =
            currentTransform === "none"
              ? 0
              : new DOMMatrixReadOnly(currentTransform).m42;
          const alreadyVisible =
            image.style.opacity === "1" && currentY < imageHeight - 0.1;
          if (!alreadyVisible) {
            animations.get(index)?.cancel();
            image.style.transform = `translateY(${imageHeight}px)`;
            image.style.opacity = "1";
            image.style.zIndex = String(++order);
          }
          const level = Number(image.style.zIndex);
          // Returning to an image reverses layers above it instead of flashing.
          const moving = [tween(index, 0)];
          images.current.forEach((node, i) => {
            if (
              node &&
              i !== index &&
              node.style.opacity === "1" &&
              Number(node.style.zIndex) > level
            )
              moving.push(tween(i, imageHeight));
          });
          void Promise.all(moving).then(() => {
            if (generation !== id) return;
            cancelAnimations();
            images.current.forEach((node, i) => {
              if (!node) return;
              node.style.opacity = i === index ? "1" : "0";
              node.style.transform = i === index ? "none" : "translateY(100%)";
              node.style.zIndex = i === index ? "1" : "0";
            });
            order = 1;
          });
        }
        preview.current.dataset.project = projects[index].title;
      }
      preview.current.dataset.visible = "true";
      cursor.current.dataset.visible = "true";
      rows.dataset.previewActive = "true";
    };
    const paint = (time: number) => {
      frame = 0;
      if (!active || !preview.current || !cursor.current) return;
      const imageTarget = {
        x: clamp(pointer.x - imageWidth / 2, 16, width - imageWidth - 16),
        y: clamp(pointer.y - imageHeight / 2, 16, height - imageHeight - 16),
      };
      const cursorTarget = {
        x: clamp(pointer.x - 32, 12, width - 76),
        y: clamp(pointer.y - 32, 12, height - 76),
      };
      const immediate = !positioned || prefersReducedMotion(preference);
      const delta = previousTime ? Math.min(time - previousTime, 64) : 16;
      const advance = (position: Point, target: Point, response: number) => {
        const amount = immediate ? 1 : 1 - Math.exp(-delta / response);
        position.x += (target.x - position.x) * amount;
        position.y += (target.y - position.y) * amount;
        if (Math.abs(position.x - target.x) < 0.05) position.x = target.x;
        if (Math.abs(position.y - target.y) < 0.05) position.y = target.y;
      };
      advance(imagePosition, imageTarget, 70);
      advance(cursorPosition, cursorTarget, 20);
      preview.current.style.width = `${imageWidth}px`;
      preview.current.style.height = `${imageHeight}px`;
      preview.current.style.transform = `translate3d(${imagePosition.x}px, ${imagePosition.y}px, 0)`;
      cursor.current.style.transform = `translate3d(${cursorPosition.x}px, ${cursorPosition.y}px, 0)`;
      positioned = true;
      previousTime = time;
      showProject();
      if (
        imagePosition.x !== imageTarget.x ||
        imagePosition.y !== imageTarget.y ||
        cursorPosition.x !== cursorTarget.x ||
        cursorPosition.y !== cursorTarget.y
      )
        frame = requestAnimationFrame(paint);
      else previousTime = 0;
    };
    const schedule = () => {
      if (!frame && active) frame = requestAnimationFrame(paint);
    };
    const move = (event: PointerEvent) => {
      if (
        !capability.matches ||
        (event.pointerType !== "mouse" && event.pointerType !== "pen")
      ) {
        hide();
        return;
      }
      const anchor =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[data-preview-index]")
          : null;
      if (!anchor || !rows.contains(anchor)) {
        hide();
        return;
      }
      const index = Number(anchor.dataset.previewIndex);
      if (!Number.isInteger(index) || !projects[index]) return;
      window.clearTimeout(exitTimer);
      active = true;
      wanted = index;
      pointer = { x: event.clientX, y: event.clientY };
      if (!requested) {
        requested = true;
        setMounted(true);
      }
      schedule();
    };
    const resize = () => {
      width = innerWidth;
      height = innerHeight;
      imageWidth = Math.max(1, Math.min(360, width - 32, (height - 32) * 1.44));
      imageHeight = imageWidth / 1.44;
      if (active) hide();
    };
    const changed = () => {
      hide();
      resetImages();
      positioned = false;
      if (!capability.matches) {
        ready.clear();
        requested = false;
        setMounted(false);
      }
    };
    controller.current = {
      loaded: (index, node) => {
        if (images.current[index] !== node) return;
        ready.add(index);
        schedule();
      },
      failed: (index) => {
        ready.delete(index);
        if (wanted === index) hide();
      },
    };
    // Fast Refresh may preserve decoded image nodes while rerunning this effect.
    const instance = controller.current;
    images.current.forEach((image, index) => {
      if (image?.complete && image.naturalWidth)
        void image
          .decode()
          .then(() => {
            if (controller.current === instance) instance.loaded(index, image);
          })
          .catch(() => {});
    });
    rows.addEventListener("pointermove", move);
    rows.addEventListener("pointerover", move);
    rows.addEventListener("pointerleave", hide);
    rows.addEventListener("click", hide);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", hide, { passive: true });
    window.addEventListener("blur", hide);
    document.addEventListener("keydown", hide);
    document.addEventListener("visibilitychange", hide);
    capability.addEventListener("change", changed);
    preference.addEventListener("change", changed);
    resize();
    return () => {
      controller.current = null;
      active = false;
      generation++;
      cancelAnimationFrame(frame);
      window.clearTimeout(exitTimer);
      cancelAnimations();
      rows.removeAttribute("data-preview-active");
      rows.removeEventListener("pointermove", move);
      rows.removeEventListener("pointerover", move);
      rows.removeEventListener("pointerleave", hide);
      rows.removeEventListener("click", hide);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", hide);
      window.removeEventListener("blur", hide);
      document.removeEventListener("keydown", hide);
      document.removeEventListener("visibilitychange", hide);
      capability.removeEventListener("change", changed);
      preference.removeEventListener("change", changed);
    };
  }, [list, projects]);

  if (!mounted) return null;
  return (
    <>
      <div
        ref={preview}
        className={styles.preview}
        aria-hidden="true"
        data-project-preview=""
        data-visible="false"
      >
        <div className={styles.surface}>
          {projects.map((project, index) => (
            <img
              key={project.image}
              ref={(node) => {
                images.current[index] = node;
              }}
              src={project.image}
              alt=""
              draggable={false}
              width={1440}
              height={1000}
              decoding="async"
              data-preview-image={project.title}
              onLoad={(event) => {
                const node = event.currentTarget;
                void node
                  .decode()
                  .then(() => controller.current?.loaded(index, node))
                  .catch(() => controller.current?.failed(index));
              }}
              onError={() => controller.current?.failed(index)}
            />
          ))}
        </div>
      </div>
      <div
        ref={cursor}
        className={styles.cursor}
        aria-hidden="true"
        data-project-cursor=""
        data-visible="false"
      >
        <span className={styles.disk}>View ↗</span>
      </div>
    </>
  );
}
