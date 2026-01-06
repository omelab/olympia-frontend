export default function AuthLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <div className="bg-[#f2f5f8]">{children}</div>;
}
