import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";

export const productsRouter = express.Router();
productsRouter.use(express.json());

productsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const productArray = await collections.products?.find({}).toArray();

        productArray
            ? res.status(200).send(productArray)
            : ReferenceError('Product array is undefined');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to get products');
    }
});

productsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        
        const query = { _id: new ObjectId(id) };
        const product = (await collections.products?.findOne(query));

        product
            ? res.status(200).send(product)
            : ReferenceError('Product is undefined');
    } catch (error) {
        console.error(error);
        res.status(404).send(`Failed to find matching product with id: ${id}`);
    }
});

productsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const result = await collections.products?.insertOne(req.body);

        result
            ? res.status(201).send(
                `Successfully created a new product with id ${result.insertedId}`
            )
            : ReferenceError("Product insertion result is undefined");
    } catch (error) {
        console.error(error);
        res.status(400).send(
            `Failed to create new product with info: ${JSON.stringify(req.body)}`
        );
    }
});

productsRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req.params.id; 
    try {
        const query = {_id: new ObjectId(id)};
        const newProduct = req.body;
      
        const result = await collections.products?.updateOne(query, {$set: newProduct});
        result
            ? result.modifiedCount
                ? res.status(200).send(`Successfully updated product with id ${id}`)
                : res.status(404).send(`Failed to find product with id ${id}`)
            : ReferenceError("Product update result is undefined");
    } catch (error) {
        console.error(error);
        res.status(400).send(`Failed to update product with id: ${id}`);
    }
});

productsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.products?.deleteOne(query);

        result
            ? result.deletedCount
                ? res.status(200).send(`Successfully deleted product with id ${id}`)
                : res.status(404).send(`Failed to find product with id ${id}`)
            : ReferenceError("Product deletion result is undefined");

    } catch (error) {
        console.error(error);
        res.status(400).send(`Failed to delete product with id ${id}`);
    }
});