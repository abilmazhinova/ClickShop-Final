import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Search, Menu, ChevronRight, Star, StarOff } from "lucide-react"
import Link from "next/link"

export default function Component() {
  const [featuredProducts, setFeaturedProducts] = useState([
    { id: 1, name: "Wireless Headphones", price: 99.99, isFeatured: false },
    { id: 2, name: "Smart Watch", price: 199.99, isFeatured: false },
    { id: 3, name: "Laptop", price: 999.99, isFeatured: false },
    { id: 4, name: "Smartphone", price: 699.99, isFeatured: false },
  ])

  const toggleFeatured = (id: number) => {
    setFeaturedProducts(featuredProducts.map(product => 
      product.id === id ? { ...product, isFeatured: !product.isFeatured } : product
    ))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <ShoppingCart className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">MyStore</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link className="transition-colors hover:text-purple-800 text-purple-600" href="/products">
                Products
              </Link>
              <Link className="transition-colors hover:text-purple-800 text-purple-600" href="/categories">
                Categories
              </Link>
              <Link className="transition-colors hover:text-purple-800 text-purple-600" href="/deals">
                Deals
              </Link>
              <Link className="transition-colors hover:text-purple-800 text-purple-600" href="/featured">
                Featured
              </Link>
              <Link className="transition-colors hover:text-purple-800 text-purple-600" href="/about">
                About
              </Link>
            </nav>
          </div>
          <Button variant="outline" size="icon" className="mr-2 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="flex w-full items-center gap-2 md:w-auto">
            <form className="flex-1 md:w-80 lg:w-96">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-white border-purple-300 focus:border-purple-500 focus:ring-purple-500 pl-8 md:w-2/3 lg:w-full"
                />
              </div>
            </form>
            <Button variant="outline" size="icon" className="ml-auto">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to MyStore
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Discover amazing products at unbeatable prices. Shop now and enjoy free shipping on orders over $50!
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">Shop Now</Button>
                <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-100">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Featured Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["Electronics", "Clothing", "Home & Garden", "Sports", "Beauty", "Books"].map((category) => (
                <Card key={category} className="bg-white border-purple-200">
                  <CardHeader>
                    <CardTitle>{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={`/placeholder.svg?height=100&width=200&text=${category}`}
                      alt={category}
                      className="w-full h-40 object-cover rounded-md"
                    />
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full text-purple-600 border-purple-600 hover:bg-purple-100">
                      Explore <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="bg-white border-purple-200">
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={`/placeholder.svg?height=100&width=200&text=${product.name}`}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <p className="mt-2 text-lg font-semibold">${product.price.toFixed(2)}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-100">
                      Add to Cart
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFeatured(product.id)}
                      className={product.isFeatured ? "text-yellow-500" : "text-gray-500"}
                    >
                      {product.isFeatured ? <Star className="h-5 w-5 fill-current" /> : <StarOff className="h-5 w-5" />}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-purple-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">About</h4>
              <ul className="space-y-1">
                <li>
                  <Link className="text-sm hover:underline text-purple-200 hover:text-white" href="/about">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link className="text-sm hover:underline text-purple-200 hover:text-white" href="/team">
                    Team
                  </Link>
                </li>
                <li>
                  <Link className="text-sm hover:underline text-purple-200 hover:text-white" href="/careers">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">Customer Service</h4>
              <ul className="space-y-1">
                <li>
                  <Link className="text-sm hover:underline text-purple-200 hover:text-white" href="/contact">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link className="text-sm hover:underline text-purple-200 hover:text-white" href="/faq">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link className="text-sm hover:underline text-purple-200 hover:text-white" href="/returns">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">Policies</h4>
              <ul className="space-y-1">
                <li>
                  <Link className="text-sm hover:underline text-purple-200 hover:text-white" href="/privacy">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="text-sm hover:underline text-purple-200 hover:text-white" href="/terms">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link className="text-sm hover:underline text-purple-200 hover:text-white" href="/shipping">
                    Shipping Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">Connect</h4>
              <ul className="space-y-1">
                <li>
                  <Link className="text-sm hover:underline text-purple-200 hover:text-white" href="https://facebook.com">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link className="text-sm hover:underline text-purple-200 hover:text-white" href="https://twitter.com">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link className="text-sm hover:underline text-purple-200 hover:text-white" href="https://instagram.com">
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-purple-200">
            © 2023 MyStore. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}