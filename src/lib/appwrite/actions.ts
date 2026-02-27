import {ID, Query} from "appwrite";
import {account, appwriteConfig, databases, storage} from "./config";

// ============================== SIGN IN
export async function signInAccount(user: {email: string; password: string}) {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );
    return {success: true, data: session, message: "Logged in successfully"};
  } catch (error: any) {
    return {success: false, error: error, message: error?.message};
  }
}

// ============================== GET ACCOUNT
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return {
      success: true,
      data: currentAccount,
      message: "User Get Successfully",
    };
  } catch (error: any) {
    return {success: false, error: error, message: error?.message};
  }
}

export async function logoutAccount() {
  try {
    await account.deleteSession("current");
    return {
      success: true,
      message: "Logged out successfully",
    };
  } catch (error: any) {
    return {success: false, error: error, message: error?.message};
  }
}

export async function createGalleryPost(payload: any) {
  const data = {...payload};
  const uploadedFile = await uploadFile(data.file[0]);
  if (!uploadedFile) {
    return {success: false, message: "Error Uploading File"};
  }
  data.imageUrl = uploadedFile.$id;
  const fileUrl = getFilePreview(uploadedFile.$id);
  if (!fileUrl) {
    await deleteFile(uploadedFile.$id);
    return {success: false, message: "Error Uploading File"};
  }
  try {
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.galleryCollectionId,
      ID.unique(),
      {
        categoryId: data?.categoryId,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        title: data?.title,
        fb_url: data?.fb_url || null,
        insta_url: data?.insta_url || null,
      }
    );
    return {
      success: true,
      message: "Item created successfully",
    };
  } catch (error: any) {
    await deleteFile(uploadedFile.$id);
    return {success: false, error: error, message: error?.message};
  }
}

export async function updateGalleryPost(oldData: any, payload: any) {
  const data = {...payload};
  if (data.file?.length > 0) {
    const uploadedFile = await uploadFile(data.file[0]);
    if (!uploadedFile) {
      return {success: false, message: "Error Uploading File"};
    }
    const fileUrl = getFilePreview(uploadedFile.$id);
    data.newFileUrl = fileUrl;
    data.newFileId = uploadedFile.$id;
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      return {success: false, message: "Error Uploading File"};
    }
  }
  try {
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.galleryCollectionId,
      oldData.$id,
      {
        categoryId: data?.categoryId,
        ...(data.newFileUrl && {
          imageUrl: data.newFileUrl,
          imageId: data.newFileId,
        }),
        title: data?.title,
        fb_url: data?.fb_url || null,
        insta_url: data?.insta_url || null,
      }
    );
    if (data.file?.length > 0) {
      await deleteFile(oldData?.imageId);
    }
    return {
      success: true,
      message: "Item updated successfully",
    };
  } catch (error: any) {
    await deleteFile(data.fileId);
    return {success: false, error: error, message: error?.message};
  }
}

// ============================== UPLOAD FILE
export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

export const getCategories = async () => {
  try {
    const categories = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId
    );
    return {
      success: true,
      data: categories.documents,
      message: "Categories get successfully",
    };
  } catch (error: any) {
    console.log(error);
    return {success: false, error: error, message: error?.message};
  }
};

export const getSingleItemById = async (id: string) => {
  try {
    const galeryData = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.galleryCollectionId,
      id
    );
    return {
      success: true,
      data: galeryData,
      message: "galeryData get successfully",
    };
  } catch (error: any) {
    console.log(error);
    return {success: false, error: error, message: error?.message};
  }
};

export const getGalleryDataByCategoryId = async (categoryId: string) => {
  try {
    const galleryItems = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.galleryCollectionId,
      [Query.equal("categoryId", categoryId)]
    );
    return {
      success: true,
      data: galleryItems.documents,
      message: "Gallery single item get successfully",
    };
  } catch (error: any) {
    console.log(error);
    return {success: false, error: error, message: error?.message};
  }
};

// ============================== GET FILE URL
export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId);
    if (!fileUrl) throw Error;
    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

// ============================== DELETE FILE
export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);
    return {status: "ok"};
  } catch (error) {
    console.log(error);
  }
}

// ============================== DELETE FILE
export async function deleteGalleryPost(docId: string, imageId: string) {
  try {
    await deleteFile(imageId);
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.galleryCollectionId,
      docId
    );
    return {
      success: true,
      message: "Gallery item deleted successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      error: error,
    };
  }
}
