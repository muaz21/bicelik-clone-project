import {
  getAccount,
  getCategories,
  getGalleryDataByCategoryId,
} from "@/lib/appwrite/actions";
import React, {createContext, useContext, useEffect, useState} from "react";

const INITIAL_STATE = {
  user: null,
  categories: null,
  setUser: () => {},
  isUserLoading: true,
  setIsUserLoading: () => {},
  isCategoriesLoading: true,
  isGalleryLoading: null,
  galleryData: null,
  getGalleryData: () => {},
  deleteGalleryItemById: () => {},
  setGalleryData: () => {},
};

const UserContext = createContext(INITIAL_STATE);

export const UserProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<any>(null);
  const [categories, setCategories] = useState<any>(null);
  const [galleryData, setGalleryData] = useState<any>(null);
  const [isUserLoading, setIsUserLoading] = useState<any>(true);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState<any>(true);
  const [isGalleryLoading, setIsGalleryLoading] = useState<any>(null);

  useEffect(() => {
    if (!categories?.length) {
      getData();
    }
    if (!user?.$id) {
      getUserData();
    }
  }, []);

  async function getUserData() {
    setIsUserLoading(true);
    const userData = await getAccount();
    if (userData?.success) {
      setUser(userData.data);
    }
    setIsUserLoading(false);
  }

  async function getData() {
    setIsCategoriesLoading(true);
    const categoriesData = await getCategories();
    if (categoriesData?.success) {
      setCategories(categoriesData.data);
      setIsCategoriesLoading(false);
    } else {
      getData();
    }
  }

  function deleteGalleryItemById(docId: string, categoryId: string) {
    const filteredData = galleryData[categoryId].filter(
      (data: any) => data.$id != docId
    );
    setGalleryData({...galleryData, [categoryId]: filteredData});
  }

  async function getGalleryData(categoryId: string) {
    if (isGalleryLoading && isGalleryLoading[categoryId]) return;
    setIsGalleryLoading({[categoryId]: true});
    if (!galleryData || !galleryData[categoryId]) {
      const gallery = await getGalleryDataByCategoryId(categoryId);
      if (gallery?.success) {
        setIsGalleryLoading({[categoryId]: false});
        setGalleryData({...galleryData, [categoryId]: gallery.data});
      }
    }
  }

  const value: any = {
    user,
    setUser,
    isUserLoading,
    setIsUserLoading,
    categories,
    isCategoriesLoading,
    isGalleryLoading,
    galleryData,
    getGalleryData,
    deleteGalleryItemById,
    setGalleryData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
