import { Collection } from "@/components/shared/Collection"
import { navLinks } from "@/constants"
import { getAllImages } from "@/lib/actions/image.actions"
import Image from "next/image"
import Link from "next/link"

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  const images = await getAllImages({ page, searchQuery })

  return (
    <>
      {/* Hero Banner */}
      <section className="home">
        <div className="relative z-10 flex flex-col items-center gap-6 w-full">

          {/* Status badge */}
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase"
            style={{
              background: 'rgba(110,231,247,0.07)',
              border: '1px solid rgba(110,231,247,0.18)',
              color: '#6ee7f7',
              letterSpacing: '0.12em',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#6ee7f7] animate-pulse" />
             Powered Image Studio
          </div>

          {/* Main heading */}
          <h1
            className="home-heading"
            style={{ letterSpacing: '-0.03em' }}
          >
            Transform images with{' '}
            <span style={{ color: '#6ee7f7' }}>artificial intelligence</span>
          </h1>

          {/* Subtext */}
          <p
            className="text-[15px] font-normal max-w-[440px] text-center"
            style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}
          >
            Restore, recolor, remove objects, and expand images using state-of-the-art AI models.
          </p>

          {/* Feature pill links */}
          <ul className="flex flex-wrap justify-center gap-2 mt-1">
            {navLinks.slice(1, 5).map((link) => (
              <Link
                key={link.route}
                href={link.route}
                className="group flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium transition-all duration-200 hover:bg-white/10 hover:text-white/90"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                <li className="flex items-center gap-2 list-none">
                  <Image
                    src={link.icon}
                    alt={link.label}
                    width={14}
                    height={14}
                    style={{ filter: 'brightness(3) opacity(0.6)' }}
                  />
                  {link.label}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery */}
      <section className="mt-10">
        <Collection
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </>
  )
}

export default Home