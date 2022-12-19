import { ProductBusiness } from "../src/business/ProductBusiness"
import { BaseError } from "../src/errors/BaseError"
import { ProductDatabaseMock } from "./mocks/ProductDatabaseMock"
import { IAddProductInputDTO, IGetProductDBDTO, IGetProductRawDBDTO, IGetProductInputDTO, IGetProductOutputDTO, IProductDB, ITagDB, Product } from "../src/models/Products"


describe("Testando a ProductBusiness", () => {
    const productBusiness = new ProductBusiness(
        new ProductDatabaseMock()
    )

    test("Deve ser possível criar um novo produto", async () => {
        const input: IAddProductInputDTO[] = [
          {
            id: 123456,
            name: "New Product Test",
            tags: ["tag-test-1", "tag-test-2"]
          },
          {
            id: 1234567,
            name: "New Product Test 2",
            tags: ["tag-test-3", "tag-test-4"]
          },  
        ]
        const response = await productBusiness.addProduct(input)

        expect(response.message).toBe("Produtos adicionados com sucesso")
    })

    test("Erro na criação de post quando já houver um produto com a mesma id", async () => {
        expect.assertions(2)

        try {
            const input: IAddProductInputDTO[] = [{
              id: 12345678,
              name: "Duplicated Product",
              tags: ["tag-test-3", "tag-test-4"]
            }]

            await productBusiness.addProduct(input)

        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toBe(409)
                expect(error.message).toBe(`já há um produto cadastrado com a ID 12345678: Duplicated Product`)
            }
        }
    })

    test("Erro no na criação quando 'name' for diferente do tipo string", async () => {
        expect.assertions(2)

        try {
            const input = [{
              id: 12348,
              name: 5615613,
              tags: ["tag-test-3", "tag-test-4"]
            }] as any

            await productBusiness.addProduct(input)

        } catch (error) {
            if (error instanceof BaseError) {
                console.log(error.message)
                expect(error.statusCode).toBe(409)
                expect(error.message).toBe("Parâmetro inválido. 'Name' deve ser uma string")
            }
        }
    })

    test("Erro no na criação ao tentar inserir um array vazio", async () => {
        expect.assertions(2)

        try {
            const input: IAddProductInputDTO[] = []

            await productBusiness.addProduct(input)

        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.statusCode).toBe(409)
                expect(error.message).toBe("Parâmetro 'produto' inválido: mínimo de 1 item")
            }
        }
    })
    
})