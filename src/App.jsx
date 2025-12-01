import { useState } from 'react'
import { ShoppingCart, Send, MessageCircle, Moon, Sun, Package, Trash2, Edit } from 'lucide-react'

const initialProducts = [
  { id: 1, name: "Ankara Maxi Dress", price: 25000, desc: "100% cotton • Free size • Perfect for owambe" },
  { id: 2, name: "Beaded Auto Gele", price: 15000, desc: "Premium beads • Ready in 10 seconds" },
  { id: 3, name: "Aso-Oke Bride Set", price: 85000, desc: "Full set with blouse & wrapper" },
  { id: 4, name: "Custom Agbada", price: 120000, desc: "Hand embroidery • Made to measure" },
  { id: 5, name: "Coral Beads Set", price: 45000, desc: "Traditional luxury beads" },
]

export default function App() {
  const [cart, setCart] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id)
      if (exists) {
        return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p)
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const updateQty = (id, change) => {
    setCart(prev => prev
      .map(p => p.id === id ? { ...p, qty: Math.max(1, p.qty + change) } : p)
      .filter(p => p.qty > 0)
    )
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0, 0)

  const whatsappMessage = cart.length > 0
    ? `Hello Chioma! I'd like to order:\n\n${cart.map(i => `${i.qty}× ${i.name}\n   ₦${(i.price * i.qty).toLocaleString()}`).join('\n')}\n\n*Total: ₦${total.toLocaleString()}*\n\nPlease send payment details. Thank you!`
    : ''

  const whatsappLink = `https://wa.me/2349012345678?text=${encodeURIComponent(whatsappMessage)}`

  // ADMIN MODE
  if (isAdmin) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'} p-8`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-5xl font-bold">Admin Dashboard</h1>
            <button
              onClick={() => setIsAdmin(false)}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl text-xl font-bold"
            >
              Exit Admin
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initialProducts.map(p => (
              <div key={p.id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
                <div className="bg-gray-200 border-2 border-dashed h-80 w-full" />
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3">{p.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{p.desc}</p>
                  <p className="text-4xl font-bold text-green-600 mb-6">₦{p.price.toLocaleString()}</p>
                  <div className="flex gap-4">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                      <Edit className="w-6 h-6" /> Edit
                    </button>
                    <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                      <Trash2 className="w-6 h-6" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button className="bg-linear-to-br from-green-500 to-teal-600 text-white rounded-3xl p-16 shadow-2xl hover:scale-105 transition-all flex flex-col items-center justify-center text-2xl font-bold">
              <Package className="w-24 h-24 mb-6" />
              Add New Product
            </button>
          </div>
        </div>
      </div>
    )
  }

  // CUSTOMER VIEW — WhatsApp Style
  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-linear-to-br from-green-50 to-teal-50 dark:from-gray-900 dark:to-black">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-900 min-h-screen flex flex-col">

          {/* WhatsApp Header */}
          <div className="bg-linear-to-r from-green-600 to-teal-600 text-white p-6 shadow-2xl sticky top-0 z-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <MessageCircle className="w-14 h-14" />
                <div>
                  <h1 className="text-3xl font-bold">Chioma Fashion Store</h1>
                  <p className="text-lg opacity-90">Online • Replies instantly</p>
                </div>
              </div>
              <button onClick={() => setDarkMode(!darkMode)} className="p-2">
                {darkMode ? <Sun className="w-8 h-8" /> : <Moon className="w-8 h-8" />}
              </button>
            </div>
          </div>

          {/* Welcome */}
          <div className="p-6">
            <div className="bg-linear-to-r from-green-100 to-teal-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 text-center shadow-xl">
              <p className="text-3xl font-bold mb-3">Welcome! 👋</p>
              <p className="text-xl opacity-80">Browse our exclusive collection</p>
            </div>
          </div>

          {/* Products */}
          <div className="px-6 space-y-10 pb-40">
            {initialProducts.map(product => (
              <div key={product.id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
                <div className="bg-gray-200 border-2 border-dashed h-96 w-full" />
                <div className="p-8">
                  <h3 className="text-3xl font-bold mb-3">{product.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">{product.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-4xl font-bold text-green-600">₦{product.price.toLocaleString()}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-linear-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-10 py-5 rounded-full text-2xl font-bold shadow-xl transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Floating Cart */}
          {cart.length > 0 && (
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-2xl border-t-8 border-green-600 z-50">
              <div className="max-w-md mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-10 h-10 text-green-600" />
                    <span className="text-2xl font-bold">{cart.reduce((a, i) => a + i.qty, 0)} items</span>
                  </div>
                  <span className="text-4xl font-bold text-green-600">₦{total.toLocaleString()}</span>
                </div>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-center py-6 rounded-3xl text-2xl font-bold shadow-2xl flex items-center justify-center gap-4 transition"
                >
                  <Send className="w-10 h-10" />
                  Complete Order on WhatsApp
                </a>
              </div>
            </div>
          )}

          {/* Admin Button */}
          <button
            onClick={() => setIsAdmin(true)}
            className="fixed bottom-6 right-6 bg-black text-white p-5 rounded-full shadow-2xl opacity-50 hover:opacity-100 transition z-40"
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  )
}