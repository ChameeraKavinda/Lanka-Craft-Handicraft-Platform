'use client'
import { Person } from '@mui/icons-material'
import { Fragment, useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useLocation, useNavigate } from 'react-router-dom'
import { Avatar, Button, Menu, MenuItem } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import AuthModal from '../../Auth/AuthModal'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, logout } from '../../../State/Auth/Action'

const navigation = {
  categories: [
    {
      id: 'wood',
      name: 'Wood',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://crafts.lk/wp-content/uploads/2023/03/20230329_122346-247x296.jpg',
          imageAlt: 'Handcrafted wood items',
        },
        {
          name: 'Best Sellers',
          href: '#',
          imageSrc: 'https://crafts.lk/wp-content/uploads/2021/01/web-7-247x296.jpg',
          imageAlt: 'Popular wood crafts',
        },
      ],
      sections: [

        {
          id: 'decor',
          name: 'Decor',
          items: [
            { name: 'statues' },
            { name: 'wall_Art' },
            { name: 'frames' },
            { name: 'boxes' },
          ],
        }, {
          id: 'furniture',
          name: 'Furniture',
          items: [
            { name: 'Tables' },
            { name: 'Chairs' },
            { name: 'Shelves' },
            { name: 'Cabinets' },
          ],
        },
      ],
    },
    {
      id: 'brass',
      name: 'Brass',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://barefootceylon.com/cdn/shop/files/IMG_3239.jpg?v=1749814309&width=1445',
          imageAlt: 'Handcrafted brass items',
        },
        {
          name: 'Best Sellers',
          href: '#',
          imageSrc: 'https://sheharahandicrafts.com/wp-content/uploads/2024/11/1-52-450x450.jpg',
          imageAlt: 'Popular brass crafts',
        },
      ],
      sections: [
        {
          id: 'decor',
          name: 'Decor',
          items: [
            { name: 'Vases' },
            { name: 'Statues' },
            { name: 'Bowls' },
          ],
        },
        {
          id: 'utensils',
          name: 'Utensils',
          items: [
            { name: 'Plates' },
            { name: 'Trays' },
            { name: 'Cups' },
          ],
        },
      ],
    },
    {
      id: 'mask',
      name: 'Mask',
      featured: [
        {
          name: 'Traditional Masks',
          href: '#',
          imageSrc: 'https://www.honeymoonguidesrilanka.com/wp-content/uploads/2024/08/Mask-Making-An-Ancient-Handicraft-of-Sri-Lanka-1200x630-1.jpg',
          imageAlt: 'Sri Lankan traditional masks',
        },
        {
          name: 'Best  Seller',
          href: '#',
          imageSrc: 'https://www.thedivinevilla.com/upload/attraction/gallery/-429721508_190773419398_1571739490_n.jpg',
          imageAlt: 'Sri Lankan traditional masks',
        },
      ],
      sections: [
        {
          id: 'dance',
          name: 'Dance Masks',
          items: [
            { name: 'KolamMasks' },
            { name: 'SanniMasks' },
          ],
        },
        {
          id: 'decor',
          name: 'Decorative Masks',
          items: [
            { name: 'WallMasks' },
            { name: 'TableMasks' },
          ],
        },
      ],
    },
    {
      id: 'art',
      name: 'Art',
      featured: [
        {
          name: 'Paintings',
          href: '#',
          imageSrc: 'https://www.bestoflanka.com/images/traditional-arts-and-crafts-of-sri-lanka_10.jpg',
          imageAlt: 'Sri Lankan art',
        },
      ],
      sections: [
        {
          id: 'paintings',
          name: 'Paintings',
          items: [
            { name: 'Canvas Paintings' },
            { name: 'Wall Paintings' },
            { name: 'Miniature Art' },
          ],
        },
        {
          id: 'sculptures',
          name: 'Sculptures',
          items: [
            { name: 'Wood Sculptures' },
            { name: 'Brass Sculptures' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'About Us', href: '#' },
    { name: 'Stores', href: '/product-details' },
  ],
}

export default function Navigation() {
  const [open, setOpen] = useState(false) // Mobile menu
  const [openAuthModal, setOpenAuthModal] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null) // User menu anchor
  const navigate = useNavigate()
  const openUserMenu = Boolean(anchorEl)
  const jwt = localStorage.getItem('jwt')
  const auth = useSelector(store => store.auth)
  const cart = useSelector(store => store.cart)
  const dispatch = useDispatch();
  const location = useLocation();


  const handleUserClick = (event) => setAnchorEl(event.currentTarget)
  const handleCloseUserMenu = () => setAnchorEl(null)
  const handleOpen = () => setOpenAuthModal(true)

  const handleClose = () => {
    setOpenAuthModal(false);

  };

  const handleCategoryClick = (categoryId, sectionId, itemName) => {
    const safeItemName = encodeURIComponent(itemName); // encode
    const path = `/${categoryId}/${sectionId}/${safeItemName}`;
    navigate(path);
    setOpen(false);
  };


  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt))
    }
  }, [jwt, dispatch])



  useEffect(() => {
    if (auth.user) {
      handleClose()
    }
    if (location.pathname === "/login" || location.pathname === "/register") {
      navigate(-1);
    }

  }, [auth.user])

  const handleLogout = () => {
    dispatch(logout())
    handleCloseUserMenu()
  }

  return (
    <div className="bg-white">
      {/* Mobile Menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop className="fixed inset-0 bg-black/25" />
        <div className="fixed inset-0 z-[10000] flex">
          <DialogPanel className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl">
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 border-b-2 border-transparent px-1 py-4 text-lg font-semibold text-gray-900 data-selected:border-indigo-600 data-selected:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel key={category.name} className="space-y-10 px-4 pt-10 pb-8">
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <img
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                          />
                          <a href={item.href} className="mt-6 block text-base font-semibold text-gray-900">
                            {item.name}
                          </a>
                          <p className="mt-1 text-sm">Shop now</p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p className="font-semibold text-gray-900">{section.name}</p>
                        <ul className="mt-6 flex flex-col space-y-4">
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <button
                                onClick={() => handleCategoryClick(category.id, section.id, item.name)}
                                className="block w-full text-left text-gray-600 text-base hover:text-gray-900"
                              >
                                {item.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop Header */}
      <header className="fixed top-0 left-0 w-full z-[9999] bg-white shadow">
        <p className="flex h-10 items-center justify-center bg-orange-800/50 px-4 text-sm font-medium text-white">
          Get free delivery on orders over Rs. 5,000
        </p>
        

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <button onClick={() => navigate('/')} className="flex items-center">
                  <img alt="Logo" src="/Image/logo.png" className="h-10 w-auto" />
                </button>
              </div>

              {/* Desktop navigation */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      <div className="relative flex">
                        <PopoverButton className="group relative flex items-center justify-center text-base font-semibold text-gray-700 hover:text-indigo-600">
                          {category.name}
                        </PopoverButton>
                      </div>
                      <PopoverPanel className="absolute inset-x-0 top-full z-20 w-full bg-white text-sm text-gray-500">
                        <div className="relative bg-white">
                          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                              <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                {category.featured.map((item) => (
                                  <div key={item.name} className="group relative text-base sm:text-sm">
                                    <img
                                      alt={item.imageAlt}
                                      src={item.imageSrc}
                                      className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                    />
                                    <a href={item.href} className="mt-6 block text-base font-semibold text-gray-900">
                                      {item.name}
                                    </a>
                                    <p className="mt-1 text-sm">Shop now</p>
                                  </div>
                                ))}
                              </div>
                              <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-8 text-sm">
                                {category.sections.map((section) => (
                                  <div key={section.name}>
                                    <p className="font-semibold text-gray-900">{section.name}</p>
                                    <ul className="mt-4 space-y-3">
                                      {section.items.map((item) => (
                                        <li key={item.name} className="flex">
                                          <Popover.Button
                                            as="button"
                                            onClick={() => handleCategoryClick(category.id, section.id, item.name)}
                                            className="text-sm text-gray-600 hover:text-gray-900"
                                          >
                                            {item.name}
                                          </Popover.Button>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  ))}
                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-base font-semibold text-gray-700 hover:text-indigo-600"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </PopoverGroup>

              {/* Right section: user, search, cart */}
              <div className="ml-auto flex items-center space-x-4">
                {auth.user?.firstname ? (
                  <div>
                    <Avatar
                      onClick={handleUserClick}
                      aria-controls={openUserMenu ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={openUserMenu ? 'true' : undefined}
                      sx={{
                        bgcolor: deepOrange[500],
                        color: 'white',
                        cursor: 'pointer',
                      }}
                    >
                      {auth.user?.firstname[0].toUpperCase()}
                    </Avatar>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={openUserMenu}
                      onClose={handleCloseUserMenu}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={() => navigate('/account/profile')}>Profile</MenuItem>
                      <MenuItem onClick={() => navigate('/account/orders')}>My Orders</MenuItem>
                      <MenuItem
                        onClick={handleLogout}
                      >
                        Logout
                      </MenuItem>
                    </Menu>
                  </div>
                ) : (
                  <Button
                    onClick={handleOpen}
                    className="text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Sign in
                  </Button>
                )}


                {/* Cart */}
                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <button
                    onClick={() => navigate('/cart')}
                    className="group -m-2 flex items-center p-2"
                  >
                    <ShoppingBagIcon className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-gray-500 cursor-pointer" />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {cart.cartItems?.length || 0}  {/* <- Dynamic count */}
                    </span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </nav>
      </header>
      <AuthModal handleClose={handleClose} open={openAuthModal} />
    </div>
  )
}
