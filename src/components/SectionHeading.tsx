import ScrollReveal from "./ScrollReveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <ScrollReveal
      className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}
    >
      <div
        className={`flex items-center gap-2 mb-4 font-mono text-xs tracking-[0.18em] text-mint uppercase ${
          align === "center" ? "justify-center" : "justify-start"
        }`}
      >
        <span className="h-px w-6 bg-mint" />
        {eyebrow}
      </div>
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-text">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-text-dim text-base sm:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}
