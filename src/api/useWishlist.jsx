import useAxiosSecure from '../hooks/useAxiosSecure';

const useWishlist = () => {
    const axiosSecure = useAxiosSecure();

    const wishlistPromise = (email) => {
        return axiosSecure.get(`/wishlist/${email}`).then(res => res.data);
    };

    const deleteWishlistItem = (id) => {
        return axiosSecure.delete(`/wishlist/${id}`).then(res => res.data);
    };

    return {
        wishlistPromise,
        deleteWishlistItem
    };
};

export default useWishlist;
