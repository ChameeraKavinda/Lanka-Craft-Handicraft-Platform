import { StarIcon } from '@heroicons/react/20/solid'
import { Box, Button, Grid, LinearProgress, Rating } from '@mui/material'
import ProductReviewCard from './ProductReviewCard'
import LinearDeterminate from './Liner'
import { dummyData } from '../../../Data/DummyData'
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findProductsById } from '../../../State/Product/Action'
import { store } from '../../../State/store'
import { addItemToCart } from '../../../State/Cart/Action'

const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { id: 'white', name: 'White', classes: 'bg-white checked:outline-gray-400' },
    { id: 'gray', name: 'Gray', classes: 'bg-gray-200 checked:outline-gray-400' },
    { id: 'black', name: 'Black', classes: 'bg-gray-900 checked:outline-gray-900' },
  ],
  sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
  ],
  details: `
This item is carefully handcrafted by skilled artisans, 
making each piece truly unique and full of character. 
Perfect for your home or as a special gift, it combines 
traditional craftsmanship with a modern touch to create a timeless piece.
`,
highlights: [' Carefully handcrafted by skilled artisans',
    ' Made with natural, eco-friendly materials',
    ' Unique design  no two items are exactly the same',
    ' Traditional craftsmanship with a modern touch',
    ' Easy returns available for every item',
    ' Discounts available on selected products',
],

  detasils:
    'se.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const { products } = useSelector(store => store);



  console.log("---", params.product_id)

 const handleAddToCart = () => {
  const data = {
    productId: Number(params.product_id), // backend expects productId
    quantity: 1                          // optional
  };

  console.log("Add to Cart payload:", data);
  dispatch(addItemToCart(data));
  navigate("/cart");
};

useEffect(() => {
  if (params.product_id) {
    dispatch(findProductsById(params.product_id));
  }
}, [dispatch, params.product_id]);


  return (
    <div className="bg-white lg:px-20 mt-10" >
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.name}
              </a>
            </li>
          </ol>
        </nav>


        {/* Additional Addd */}
        <section className='grid grid-cols-1 lg:grid-cols-2 gapx8 gap-y-10 px-4 pt-10'>


          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className='overflow-hidden rounded-lg w-[30rem] h-[35rem]'>
              <img
                alt=""
                src={products.product?.imageUrl}
                className="w-full h-full object-contain object-center"
              />
            </div>

            <div className='flex flex-wrap gap-5 justify-center mt-4'>
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className='aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem]'
                >

                </div>
              ))}
            </div>
          </div>


          {/* Product info */}
          <div className="lg:col-span-1 max-auto max-w-2xl px-4 pb-16 lg:max-w-7xl lg:px-8
          lg:pb-24">
            <div className="lg:col-span-2 ">
              <h1 className="text-lg lg:text-xl font-semibold text-gray-900">{products.product?.brand}</h1>
              <h1 className="text-lg lg:text-xl  text-gray-900 opacity-60 pt-1">{products.product?.title}</h1>

            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className='flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6'>
                <p className='font-semibold'>
               Rs.{(products.product?.price - products.product?.price * (products.product?.discountPresent / 100)).toFixed(2)}.00
                </p>
                <p className='opacity-50 line-through'>
                 
                </p>
                <p className='text-green-600 font-semibold'>
                  {products.product?.discountPresent}% Off
                </p>
              </div>


              {/* Reviews */}
              <div className="mt-6">
                <div className='flex items-center space-x-3'>
                  <Rating name="read-only" value={5.5} readOnly />
                  <p className='opacity-50 text-sm'>78,945 Ratings</p>
                  <p className='text-sm font-medium text-indigo-500 hover:text-indigo-400 cursor-pointer'>
                    2,356 Reviews
                  </p>
                </div>

              </div>

              <form className="mt-10">




                <Button onClick={handleAddToCart} variant='contained' sx={{ px: "2rem", py: "1rem", bgcolor: "#D97D54", '&:hover': { bgcolor: "#C06A40" } }}>
                  Add to Cart
                </Button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">{products.product?.description}</p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900 ">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600 font-bold leading-10">{product.details}</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Rating & Reviews Implement */}
        <section>
          <h1 className="font-semibold text-lg pb-4 mb-4">Recent Review & Rating</h1>

          <div className="border border-gray-300 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
            <Grid container spacing={40}>
              {/* Left Side - Reviews */}
              <Grid item xs={7}>
                <div className="space-y-5">
                  {[1, 1, 1].map((item, i) => (
                    <ProductReviewCard key={i} />
                  ))}
                </div>
              </Grid>

              {/* Right Side - Ratings */}
              <Grid item xs={5}>
                <h1 className="text-xl font-semibold pb-3">Product Ratings</h1>

                <div className="flex items-center space-x-3 pt-4">
                  <Rating value={3.6} readOnly precision={0.5} />
                  <p className="opacity-65">5,998,788 Ratings</p>
                </div>

                {/* Rating Bars */}
                <Box display="flex" alignItems="center" gap={2} mt={4}>
                  <LinearProgress
                    sx={{ bgcolor: "lightgray", borderRadius: 4, height: 7, flex: 1, width: "300px" }}
                    variant="determinate"
                    value={80}
                    color="success"
                  />
                  <p>Excellent</p>
                </Box>

                <Box display="flex" alignItems="center" mt={4} gap={2}>
                  <LinearProgress
                    sx={{ bgcolor: "lightgray", borderRadius: 4, height: 7, flex: 1 }}
                    variant="determinate"
                    value={60}
                    color="primary"
                  />
                  <p>Very Good</p>
                </Box>

                <Box display="flex" alignItems="center" mt={4} gap={2}>
                  <LinearProgress
                    sx={{ bgcolor: "lightgray", borderRadius: 4, height: 7, flex: 1 }}
                    variant="determinate"
                    value={40}
                    color="warning"
                  />
                  <p>Good</p>
                </Box>

                <Box display="flex" alignItems="center" mt={4} gap={2}>
                  <LinearProgress
                    sx={{ bgcolor: "lightgray", borderRadius: 4, height: 7, flex: 1 }}
                    variant="determinate"
                    value={15}
                    color="error"
                  />
                  <p>Poor</p>
                </Box>
              </Grid>
            </Grid>
          </div>
        </section>


        {/* Similar Products */}
        <section className='pt20 mt-5'>
          <h1 className='py-5 font-bold text-xl'>Similar Products</h1>
          <div className="flex flex-wrap ">
            {dummyData.map((item) => <HomeSectionCard product={item} />)}
          </div>
        </section>

      </div>
    </div>
  )
}
