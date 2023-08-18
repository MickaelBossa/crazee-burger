import AdminFormRightSide from './AdminFormRightSide/AdminFormRightSide';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './AdminForm.module.css';

export default function AdminForm({ addProduct }) {
    const [newProduct, setNewProduct] = useState({
        id: '',
        title: '',
        imageSource: '',
        price: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const newProductToAdd = {
            id: uuidv4(),
            title: newProduct.title,
            imageSource: newProduct.imageSource
                ? newProduct.imageSource
                : '/images/coming-soon.png',
            price: newProduct.price ? newProduct.price : '0,00',
        };

        addProduct(newProductToAdd);
        setNewProduct({
            id: '',
            title: '',
            imageSource: '',
            price: '',
        });
    };

    return (
        <form className={styles.adminPanelForm} onSubmit={handleSubmit}>
            <div className={styles.adminPanelLeftSide}>
                {newProduct.imageSource ? (
                    <img
                        src={newProduct.imageSource}
                        alt={newProduct.title}
                        className={styles.previewProduct}
                    />
                ) : (
                    <p>Aucune image</p>
                )}
            </div>
            <AdminFormRightSide
                newProduct={newProduct}
                setNewProduct={setNewProduct}
            />
        </form>
    );
}
