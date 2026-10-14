import Image from "next/image";
import Link from "next/link";

type Props = {
  href?: string;
  className?: string;
  priority?: boolean;
};

export default function BrandLogo({
  href = "/",
  className = "",
  priority = false,
}: Props) {
  const mark = (
    <Image
      src="/brand/fotoowl-logo.png"
      alt="FotoOwl"
      width={160}
      height={32}
      priority={priority}
      className={`home-logo home-logo-nav ${className}`.trim()}
    />
  );

  if (!href) return mark;

  return (
    <Link
      href={href}
      className="home-logo-link cursor-pointer"
      aria-label="FotoOwl home"
    >
      {mark}
    </Link>
  );
}
