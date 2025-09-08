import Link from "next/link";

export default function HubCard({
  title, desc, href, external = false,
}: { title: string; desc: string; href: string; external?: boolean }) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      className="group block rounded-xl border p-5 hover:shadow-md transition"
    >
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="opacity-0 group-hover:opacity-100 text-sm text-gray-500">→</span>
      </div>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
    </Link>
  );
}

