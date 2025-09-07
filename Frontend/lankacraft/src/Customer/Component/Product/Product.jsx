'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from '@heroicons/react/20/solid'
import ProductCard from './ProductCard'
import { Filter, singleFilter } from './filterData'
import { useLocation, useNavigate, useParams } from 'react-router-dom'   
import { useDispatch, useSelector } from 'react-redux'
import { findProducts } from '../../../State/Product/Action'

const sortOptions = [
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const allFilters = [...Filter, ...singleFilter].filter(
    section => section.id.toLowerCase() !== 'color'
  )

  const location = useLocation()
  const navigate = useNavigate()
  const param = useParams()
  const dispatch = useDispatch()
  
  // ⬇️ CHANGED: useSelector with products
  const { products } = useSelector(store => store)

  const decodedQueryString = decodeURIComponent(location.search)
  const searchParams = new URLSearchParams(decodedQueryString)
  const priceValue = searchParams.get("price")
  const discount = searchParams.get("discount")
  const sortValue = searchParams.get("sort")
  const pageNumber = searchParams.get("page") || 1
  const stock = searchParams.get("stock")

  const handleFilter = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search)
    let filterValue = searchParams.getAll(sectionId)

    if (filterValue.length > 0 && filterValue[0].split(',').includes(value)) {
      filterValue = filterValue[0].split(',').filter((item) => item !== value)
      if (filterValue.length === 0) {
        searchParams.delete(sectionId)
      }
    } else {
      filterValue.push(value)
    }

    if (filterValue.length > 0) {
      searchParams.set(sectionId, filterValue.join(','))
    }

    const query = searchParams.toString()
    navigate({ search: `?${query}` })
  }

  useEffect(() => {
    let minPrice = 0
    let maxPrice = 1000000

    if(priceValue) {
      if(priceValue.endsWith('+')) {
        minPrice = Number(priceValue.replace('+',''))
        maxPrice = Infinity
      } else {
        [minPrice, maxPrice] = priceValue.split("-").map(Number)
        if(minPrice > maxPrice) [minPrice, maxPrice] = [maxPrice, minPrice]
      }
    }

    const data = {
      category: param.thirdLevel,
      minPrice,
      maxPrice,
      minDiscount: discount || 0,
      sort: sortValue || "price_low",
      pageNumber: pageNumber - 1,
      pageSize: 10,
      stock: stock
    }
    dispatch(findProducts(data))
  }, [
    param.thirdLevel,
    priceValue,
    discount,
    sortValue,
    pageNumber,
    stock
  ])

  // ⬇️ CHANGED: filteredProducts now use products
  const filteredProducts = products.products?.content?.filter(item => {
    let min = 0
    let max = Infinity

    if(priceValue) {
      if(priceValue.endsWith('+')) {
        min = Number(priceValue.replace('+',''))
      } else {
        [min, max] = priceValue.split("-").map(Number)
        if(min > max) [min, max] = [max, min]
      }
    }

    if(item.price < min || item.price > max) return false
    if(discount && item.discountPresent < Number(discount)) return false
    if(stock) {
      if(stock === 'in-stock' && item.stock <= 0) return false
      if(stock === 'out-of-stock' && item.stock > 0) return false
    }

    return true
  })

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />
          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                >
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              <form className="mt-4 border-t border-gray-200">
                {allFilters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3>
                      <DisclosureButton className="group flex w-full items-center justify-between px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="size-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="size-5 hidden group-data-[open]:block"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <input
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              defaultChecked={option.checked}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              onChange={() =>
                                handleFilter(option.value, section.id)
                              }
                            />
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto px-4 sm:px-6 lg:px-20 mt-10">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  />
                </MenuButton>

                <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-hidden">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current
                              ? 'font-medium text-gray-900'
                              : 'text-gray-500',
                            'block px-4 py-2 text-sm hover:bg-gray-100'
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="ml-4 p-2 text-gray-400 hover:text-gray-500 lg:hidden"
              >
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section className="pt-6 pb-24">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              <form className="hidden lg:block lg:col-span-1">
                {allFilters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <h3>
                      <DisclosureButton className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 hidden group-data-[open]:block"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <input
                              onChange={() =>
                                handleFilter(option.value, section.id)
                              }
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              defaultChecked={option.checked}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="text-sm text-gray-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>

              <div className="lg:col-span-4 w-full">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-white py-5">
                  {filteredProducts?.map((item) => (
                    <ProductCard key={item.id} product={item} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
