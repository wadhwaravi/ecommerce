import { useEffect, useState } from "react";
import MyContext from "./myContext";
import { toast } from "react-toastify";
import {
  QuerySnapshot,
  Timestamp,
  addDoc,
  collection,
  orderBy,
  query,
  onSnapshot,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { fireDb } from "../../firebase/FireBaseConfig";

function myState(props) {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17,24,39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  });

  const addProduct = async () => {
    if (
      products.title === null ||
      products.price === null ||
      products.imageUrl === null ||
      products.category === null ||
      products.description === null
    ) {
      return toast.error("All fields are mandatory");
    }
    setLoading(true);
    try {
      const productRef = collection(fireDb, "products");
      await addDoc(productRef, products);
      setTimeout(() => {
        toast.success("Product added successfully");
      }, 800);

      window.location.href = "/dashboard";
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const [product, setProduct] = useState([]);
  const getProductData = async () => {
    try {
      const q = query(collection(fireDb, "products"), orderBy("time", "desc"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productArray);
      });
      return () => data;
    } catch (error) {
      console.log(error);
    }
  };
  // update product function
  const editHandle = (item) => {
    setProducts(item);
  };
  const updateProduct = async () => {
    try {
      await setDoc(doc(fireDb, "products", products.id), products);
      toast.success("Product updated successfully");
      getProductData();
      window.location.href = "/dashboard";
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductData();
  }, []);

  const deleteProduct = async (item) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDb, "products", item.id));
      toast.success("Product deleted successfully");
      getProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        addProduct,
        product,
        setProduct,
        editHandle,
        updateProduct,
        deleteProduct,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default myState;
