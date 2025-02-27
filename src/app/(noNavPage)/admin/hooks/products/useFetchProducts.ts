import { useState, useEffect } from "react";
import { fetchProducts } from "@/app/apis/product";

const useFetchProducts = (searchQuery, category, pagination, setPagination, forceFetch,orderBy, orderWith) => {
  const [products, setProducts] = useState([]);

  const fetchProductLists = async () => {
    try {
      const productData = await fetchProducts(
        searchQuery,
        category ? [parseInt(category)] : [],
        pagination.page.toString(),
        pagination.pageSize.toString(),
        orderBy,
        orderWith,
      );
      setProducts(productData.products);
      setPagination(productData.pagination);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProductLists();
  }, [searchQuery, category, pagination.page, pagination.pageSize, forceFetch,orderBy, orderWith]); // เพิ่ม forceFetch ใน dependency

  return products;
};

export default useFetchProducts;
