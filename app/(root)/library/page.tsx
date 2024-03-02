import { Collection } from "@/components/shared/Collection"
import { navLinks } from "@/constants"
import { getAllImages } from "@/lib/actions/image.actions"
import Image from "next/image"
import Link from "next/link"

const Library = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  const images = await getAllImages({ page, searchQuery})

  const tab = 'Profiles'

  return (
    <>
      <div className="root-container">
        <h2 className="h2-bold text-dark-600">Library</h2>
        <p className="p-20-regular text-dark-400 mt-3">Browse through a selection of profiles, extensions, LLM's, and voices.</p>
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

export default Library