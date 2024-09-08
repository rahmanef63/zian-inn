import Image from "next/image";
import Link from "next/link";
import { useTheme } from 'next-themes'

const LogoZian = () => {
    const { theme } = useTheme()
  return (
    <div>
      <Link href="/">
          {theme === 'light' ? (
            <Image src="/logo-navbar.png" alt="logo" width={100} height={100} />
          ) : (
            <Image src="/logo-navbar-dark.png" alt="logo" width={100} height={100} />
          )}
      </Link>
    </div>
  )
}

export default LogoZian;