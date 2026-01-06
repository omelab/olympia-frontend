import styles from './skeleton.module.css';

type propsTypes = {
  width?: number | any;
  height?: number | any;
  className?: any;
  style?: any;
  variant?: string;
};

const Skeleton = ({
  width,
  height,
  className,
  style,
  variant = 'rectangular',
  ...props
}: propsTypes) => {
  return (
    <div
      className={`${styles.skeleton} ${className || ''}`}
      style={{
        width,
        height,
        ...(variant === 'circle' && { borderRadius: '50%' }),
        ...style,
      }}
      {...props}
    />
  );
};

export default Skeleton;
