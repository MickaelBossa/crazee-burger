import { formatPrice } from '../../../utils/math';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import styles from './ProductCard.module.css';
import { TiDelete } from 'react-icons/ti';

export default function ProductCard({
    product,
    isAdmin,
    deleteProduct,
    activeEditMode,
    isActive,
}) {
    const hoverableCardStyle = isAdmin && styles.hoverableCard;

    const activeProductCard = isAdmin && isActive && styles.activeProductCard;

    return (
        <div
            className={`${styles.productCard} ${hoverableCardStyle} ${activeProductCard}`}
            onClick={isAdmin ? () => activeEditMode(product) : () => {}}
        >
            {isAdmin && (
                <div
                    className={styles.deleteIconContainer}
                    onClick={deleteProduct}
                >
                    <TiDelete
                        className={`${styles.deleteIcon} ${styles.activeCardDeleteBtnStyle}`}
                    />
                </div>
            )}

            <div className={styles.imgContainer}>
                <img
                    src={product.imageSource}
                    alt={`Image de ${product.title}`}
                    className={styles.productImg}
                />
            </div>
            <p className={styles.productTitle}>{product.title}</p>
            <div className={styles.priceAndBtnContainer}>
                <p className={styles.productPrice}>
                    {formatPrice(product.price)} €
                </p>
                <PrimaryButton
                    width={'95px'}
                    label={'Ajouter'}
                    height={'38px'}
                    primary={true}
                    className={styles.activeCardStyle}
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
        </div>
    );
}
