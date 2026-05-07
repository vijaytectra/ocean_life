// components/Loader.js
import Styles from "./Loader.module.css"; // Your custom CSS styles

const Loader = () => {
  return (
    <div className={Styles.loaderWrapper}>
      <div className={Styles.loader}></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
