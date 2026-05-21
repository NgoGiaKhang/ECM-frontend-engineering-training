import styles from "./styles.module.css"
import type { FormData } from './ProductFormPage'
import TextField from "../../../../components/FormField/TextField"
import { useFormContext } from "../../../../core/Form/FormContext"
import TextAreaField from "../../../../components/FormField/TextAreaField"

export function FieldSection() {
    const { errors, form } = useFormContext<FormData>()

    return (
        <>
            <TextField
                id="name"
                type="text"
                name="name"
                label="Product Name"
                placeholder="iPhone 15 Pro Max"
            />

            <TextAreaField
                name='description'
                label='Description'
                placeholder="Description..."
                rows={5}
            />

            <TextField
                id="price"
                type="number"
                name="price"
                label="Price"
                placeholder="31990000"
            />


            {/* CATEGORY */}

            <TextField
                id="category"
                type="text"
                name="category"
                label="Category"
                placeholder="Smartphone"
            />



            {/* TAGS */}

            <TextField
                id="tags"
                type="text"
                label="Tags"
                name="tags"
                placeholder="apple, iphone, ios"
            />


            {/* IMAGE */}

            <TextField
                id="imageUrl"
                type="url"
                name="imageUrl"
                label="Image URL"
                placeholder="https://..."
            />

            {/* PREVIEW */}
            {form.imageUrl &&
                !errors.imageUrl && (
                    <div
                        className={styles.preview}
                    >
                        <img
                            src={form.imageUrl}
                            alt="preview"
                        />
                    </div>
                )}
        </>
    )
}
