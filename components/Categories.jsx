import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { getCategories } from '../services'

const Categories = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getCategories()
        .then((newCategories) => setCategories(newCategories))
    }, [])
    return (
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 mb-8 pb-12 text-sm sm:text-base">
            <h3 className="text-center text-sm sm:text-xl mb-4 sm:mb-8 font-semibold border-b border-blue-300 pb-4">
                Categories
            </h3>
            {categories.map((category) =>(
               <Link key={category.slug}  href={`/category/${category.slug}`}>
                   <span className="cursor-pointer block pb-3 mb-3 hover:text-pink-500 text-center">
                   {category.name}
                   </span>
               </Link> 
            ))}
        </div>
    )
}

export default Categories
