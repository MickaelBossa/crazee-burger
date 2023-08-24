import { useParams } from 'react-router-dom';
import { fakeMenu } from '../../fakeData/fakeMenu';
import NavBar from './NavBar/NavBar';
import ProductCard from '../../components/ui/ProductCard/ProductCard';
import { useState } from 'react';
import AdminPanel from './AdminPanel/AdminPanel';
import AdminContext from '../../context/AdminContext';
import 'react-toastify/dist/ReactToastify.css';
import OutOfStockMsg from './OutOfStockMsg/OutOfStockMsg';
import styles from './OrderPage.module.css';

export default function OrderPage() {
    const [products, setProducts] = useState(fakeMenu.LARGE);

    const [isAdmin, setIsAdmin] = useState(false);

    const [isAdminPanelVisible, setIsAdminPanelVisible] = useState(true);
    const [activeTab, setActiveTab] = useState(0);

    const [hasProductAdded, setHasProductAdded] = useState(false);

    const params = useParams();

    const toggleAdminMode = () => {
        setIsAdmin(!isAdmin);
    };

    const toggleActiveTab = (nbr) => {
        if (isAdminPanelVisible) {
            setActiveTab(nbr);
        } else {
            setIsAdminPanelVisible(!isAdminPanelVisible);
            setActiveTab(nbr);
        }
    };

    const toggleAdminPanelVisibility = () => {
        setIsAdminPanelVisible(!isAdminPanelVisible);
    };

    const deleteProduct = (id) => {
        const newProducts = products.filter((product) => product.id !== id);
        setProducts(newProducts);
    };

    const addProduct = (newProduct) => {
        const newProducts = [newProduct, ...products];
        setProducts(newProducts);
        setHasProductAdded(true);
        setTimeout(() => {
            setHasProductAdded(false);
        }, '2000');
    };

    return (
        <AdminContext.Provider value={isAdmin}>
            <div className={styles.container}>
                <NavBar params={params} toggleAdminMode={toggleAdminMode} />
                <main className={styles.mainContent}>
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            isAdmin={isAdmin}
                            deleteProduct={() => deleteProduct(product.id)}
                            activeEditMode={toggleActiveTab}
                        />
                    ))}
                    {products.length === 0 ? (
                        <OutOfStockMsg
                            isAdmin={isAdmin}
                            setProducts={setProducts}
                        />
                    ) : null}
                    {isAdmin && (
                        <AdminPanel
                            toggleActiveTab={toggleActiveTab}
                            toggleAdminPanelVisibility={
                                toggleAdminPanelVisibility
                            }
                            activeTab={activeTab}
                            isAdminPanelVisible={isAdminPanelVisible}
                            addProduct={addProduct}
                            hasProductAdded={hasProductAdded}
                        />
                    )}
                </main>
            </div>
        </AdminContext.Provider>
    );
}
