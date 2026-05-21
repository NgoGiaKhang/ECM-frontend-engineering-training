// CreateProductForm.tsx

import styles from "./styles.module.css";
import { Validator } from "../../../../core/validator/Validator";
import { ActionSection } from "./ActionSection";
import { FieldSection } from "./FieldSection";
import { isRequired, isUrl, minLength, minNumber } from "../../../../core/validator";
import Form from "../../../../components/FormField/Form";




export type FormData = {
    name: string;
    description: string;
    price: string;
    category: string;
    tags: string;
    imageUrl: string;
};

const initialState: FormData = {
    name: "",
    description: "",
    price: "",
    category: "",
    tags: "",
    imageUrl: "",
};

const validator = new Validator({
    name: [
        isRequired("Product name is required",),
    ],

    description: [
        isRequired("Description is required",),
        minLength(10, "Description must be at least 10 characters",),
    ],

    price: [
        isRequired("Price is required"),
        minNumber(1, "Price must be greater than 0",),
    ],

    category: [
        isRequired("Category is required",),
    ],
    imageUrl: [
        isRequired("Image URL is required",),
        isUrl("Invalid image URL"),
    ],
});

export default function CreateProductForm() {


    return (
        <div className={styles.container}>
            <Form<FormData>
                initialState={initialState}
                className={styles.form}
                validator={validator}
                onSubmit={(e) => console.log(e)}
            >
                <div className={styles.header}>
                    <h1>Create Product</h1>

                    <p>
                        Add new product to your
                        store
                    </p>
                </div>

                <FieldSection/>
                <ActionSection/>
            </Form>
        </div>
    );
}