import styles from './PrimaryButton.module.css';

export default function PrimaryButton({
    Icon,
    width,
    label,
    height,
    fontSize,
    primary,
    onClick,
    className,
}) {
    const customPrimaryButtonStyle = {
        width: width || '400px',
        height: height && height,
    };

    const customBtnTagStyle = {
        fontSize: fontSize,
    };

    const buttonContainerClass = primary
        ? styles.primaryButtonContainer
        : styles.secondaryButtonContainer;

    return (
        <div
            className={`${styles.defaultContainer} ${buttonContainerClass} ${className}`}
            style={customPrimaryButtonStyle}
            onClick={onClick}
        >
            <button style={customBtnTagStyle} type="submit">
                {label}
            </button>
            {Icon && Icon}
        </div>
    );
}
