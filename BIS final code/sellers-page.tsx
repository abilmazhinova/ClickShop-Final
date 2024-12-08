"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Camera, Star } from "lucide-react"
import Image from "next/image"

// Mock data for existing products
const initialProducts = [
  { id: 1, name: "Elegant Watch", category: "Accessories", photos: ["/placeholder.svg"], averageRating: 4.5, totalReviews: 120 },
  { id: 2, name: "Leather Bag", category: "Fashion", photos: ["/placeholder.svg"], averageRating: 4.2, totalReviews: 85 },
]

export default function SellersPage() {
  const [products, setProducts] = useState(initialProducts)
  const [newProduct, setNewProduct] = useState({ name: "", category: "", description: "" })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
  }

  const handleCategoryChange = (value: string) => {
    setNewProduct({ ...newProduct, category: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const product = {
      id: products.length + 1,
      ...newProduct,
      photos: ["/placeholder.svg"],
      averageRating: 0,
      totalReviews: 0,
    }
    setProducts([...products, product])
    setNewProduct({ name: "", category: "", description: "" })
  }

  const totalReviews = products.reduce((sum, product) => sum + product.totalReviews, 0)
  const averageRating = products.reduce((sum, product) => sum + product.averageRating, 0) / products.length

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Seller&apos;s Dashboard</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
            <CardDescription>Fill in the details to add a new product to your store.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" value={newProduct.name} onChange={handleInputChange} required />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" value={newProduct.category} onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                      <SelectItem value="Fashion">Fashion</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Home">Home</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" value={newProduct.description} onChange={handleInputChange} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="photos">Photos</Label>
                  <div className="flex items-center space-x-2">
                    <Button type="button" variant="outline" size="icon">
                      <Camera className="h-4 w-4" />
                      <span className="sr-only">Upload photo</span>
                    </Button>
                    <span className="text-sm text-muted-foreground">No photos uploaded</span>
                  </div>
                </div>
              </div>
              <Button type="submit" className="mt-4">Add Product</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics Overview</CardTitle>
            <CardDescription>Quick summary of your store&apos;s performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Products:</span>
                <span className="text-2xl font-bold">{products.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Reviews:</span>
                <span className="text-2xl font-bold">{totalReviews}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Average Rating:</span>
                <span className="text-2xl font-bold flex items-center">
                  {averageRating.toFixed(1)}
                  <Star className="h-5 w-5 ml-1 fill-yellow-400 stroke-yellow-400" />
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4">Your Products</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square relative mb-4">
                <Image
                  src={product.photos[0]}
                  alt={product.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {product.totalReviews} reviews
                </span>
                <span className="flex items-center">
                  {product.averageRating.toFixed(1)}
                  <Star className="h-4 w-4 ml-1 fill-yellow-400 stroke-yellow-400" />
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Edit Product</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}