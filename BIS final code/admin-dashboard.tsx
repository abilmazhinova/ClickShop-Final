'use client'

import { useState, useEffect } from 'react'
import { Pencil, Trash2, Plus, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Product = {
  id: number
  name: string
  price: number
  stock: number
  category: string
}

const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Toys']

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Laptop", price: 999.99, stock: 50, category: "Electronics" },
    { id: 2, name: "Smartphone", price: 599.99, stock: 100, category: "Electronics" },
    { id: 3, name: "Headphones", price: 129.99, stock: 200, category: "Electronics" },
    { id: 4, name: "T-Shirt", price: 19.99, stock: 300, category: "Clothing" },
    { id: 5, name: "Novel", price: 14.99, stock: 150, category: "Books" },
  ])
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list')
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter ? product.category === categoryFilter : true)
  )

  const deleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id))
  }

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Math.max(...products.map(p => p.id)) + 1 }
    setProducts([...products, newProduct])
    setView('list')
  }

  const updateProduct = (product: Product) => {
    setProducts(products.map(p => p.id === product.id ? product : p))
    setView('list')
  }

  const ProductForm = ({ product, onSubmit }: { product?: Product, onSubmit: (product: Product | Omit<Product, 'id'>) => void }) => {
    const [name, setName] = useState(product?.name || '')
    const [price, setPrice] = useState(product?.price.toString() || '')
    const [stock, setStock] = useState(product?.stock.toString() || '')
    const [category, setCategory] = useState(product?.category || categories[0])

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit({
        id: product?.id || 0,
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
        category
      })
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
          step="0.01"
        />
        <Input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          min="0"
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit">{product ? 'Update Product' : 'Add Product'}</Button>
      </form>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {view === 'list' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Product List
              <Button onClick={() => setView('add')} className="ml-2">
                <Plus className="mr-2 h-4 w-4" /> Add Product
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={categoryFilter || ''} onValueChange={(value) => setCategoryFilter(value || null)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="icon" onClick={() => {
                        setCurrentProduct(product)
                        setView('edit')
                      }} className="mr-2">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => deleteProduct(product.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
      {view === 'add' && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductForm onSubmit={addProduct} />
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => setView('list')}>Cancel</Button>
          </CardFooter>
        </Card>
      )}
      {view === 'edit' && currentProduct && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Product</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductForm product={currentProduct} onSubmit={updateProduct} />
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => setView('list')}>Cancel</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}