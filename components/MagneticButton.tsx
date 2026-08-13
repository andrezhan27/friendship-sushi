export default function MagneticButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
}) {
  return (
    <a
      className={`magnetic-button magnetic-button--${variant}`}
      href={href}
    >
      <span>{children}</span>
    </a>
  );
}
