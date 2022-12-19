import { Router } from 'express'
import { ProductBusiness } from '../business/ProductBusiness'
import { ProductController } from '../controller/ProductController'
import { ProductDatabase } from '../database/ProductDatabase'

export const productRouter = Router()

const productController = new ProductController(
    new ProductBusiness(
        new ProductDatabase()
    ) 
)

productRouter.post("/new", productController.addProduct)

productRouter.post("/new/xml", productController.addProductXml)

productRouter.get("/", productController.getProducts)

