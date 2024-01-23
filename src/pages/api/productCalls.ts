const postProduct = async (productUrl: string) => {
  try {
    const res = await fetch(`https://thrifty-pet-be.vercel.app/api/v1/products/create`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({productUrl})
    })
    if (!res.ok) {
      throw new Error (`${res.status}: Failed to post product link`)
    }
    return res.json()
  } catch (error) {
    throw new Error(`${(error as Error).message}: Failed in post a product link catch block`)
  }
}

const getAllProducts = async () => {
  try {
    const res = await fetch('https://thrifty-pet-be.vercel.app/api/v1/products/get')
    if (!res.ok) {
      throw new Error (`${res.status}: Failed to get all products`)
    }
    return res.json()
  }catch (error) {
    throw new Error(`${(error as Error).message}: Failed in get all products catch block`)
  }
}

const getProductById = async (productId: string) => {
  try {
    const res = await fetch(`https://thrifty-pet-be.vercel.app/api/v1/products/get/${productId}`)
    if (!res.ok) {
      throw new Error (`${res.status}: Failed to get product by id`)
    }
    return res.json()
  } catch (error) {
    throw new Error(`${(error as Error).message}: Failed in get product by id catch block`)
  }
}

export {
  postProduct, 
  getAllProducts,
  getProductById
}