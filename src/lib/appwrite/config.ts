import {Client, Account, Databases, Storage, Avatars, Locale} from "appwrite";

export const appwriteConfig = {
  url: import.meta.env.VITE_APPWRITE_URL,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  galleryCollectionId: import.meta.env.VITE_APPWRITE_GALLERY_COLLECTION_ID,
  categoriesCollectionId: import.meta.env
    .VITE_APPWRITE_CATEGORIES_COLLECTION_ID,
};

export const client = new Client();
export const locale = new Locale(client);

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
