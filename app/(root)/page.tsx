import { Collection } from "@/components/shared/Collection"
import { navLinks } from "@/constants"
import { getAllImages } from "@/lib/actions/image.actions"
import Image from "next/image"
import Link from "next/link"

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  const images = await getAllImages({ page, searchQuery})

  return (
    <>
      <div className="root-container">
        {/* Title */}
        <h2 className="h2-bold text-dark-600">Juno</h2>
        {/* Subtitle */}
        <p className="p-20-regular text-dark-400 mt-2">Juno offers a seamless integration of AI into your browser, enhancing your browsing experience with customizable intelligence.</p>
      </div>

      <section className="sm:mt-12">
        <Collection 
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
          tab ={"Profiles"}
        />
      </section>
    </>
  )
}

export default Home