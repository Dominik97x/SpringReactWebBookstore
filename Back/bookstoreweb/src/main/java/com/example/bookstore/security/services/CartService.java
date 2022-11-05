package com.example.bookstore.security.services;

import com.example.bookstore.models.AddToCart;
import com.example.bookstore.models.CheckoutCart;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CartService {

    List<AddToCart> addCartbyUserIdAndProductId(long productId,long userId,int qty,double price) throws Exception;

    void updateQtyByCartId(long cartId,int qty,double price) throws Exception;

    List<AddToCart> getCartByUserId(long userId);

    List<AddToCart> removeCartByUserId(long cartId, long userId);

    List<AddToCart> removeAllCartByUserId(long userId);

    Boolean checkTotalAmountAgainstCart(double totalAmount,long userId);

    List<CheckoutCart> getAllCheckoutByUserId(long userId);

    List<CheckoutCart> saveProductsForCheckout(List<CheckoutCart> tmp)  throws Exception;
}
