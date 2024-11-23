import * as Keychain from "react-native-keychain";

// Lưu token
export const saveToken = async (token: string) => {
  try {
    if (Keychain) {
      // Kiểm tra xem Keychain có được khởi tạo không
      await Keychain.setGenericPassword("token", token);
    } else {
      console.error("Keychain is not initialized correctly.");
    }
  } catch (error) {
    console.error("Error saving token", error);
  }
};

// Lấy token
export const getToken = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials.password; // Token được lưu dưới dạng mật khẩu
    }
    return null;
  } catch (error) {
    console.error("Error getting token", error);
  }
};

// Xóa token
export const deleteToken = async () => {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {
    console.error("Error deleting token", error);
  }
};
