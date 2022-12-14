package com.example.bookstore.security.services;

import com.example.bookstore.models.AddToCart;
import com.example.bookstore.models.Book;
import com.example.bookstore.models.CheckoutCart;
import com.example.bookstore.repository.AddToCartRepo;
import com.example.bookstore.repository.CheckoutRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService{


    @Autowired
    AddToCartRepo addCartRepo;
    @Autowired
    CheckoutRepo checkOutRepo;
    @Autowired
    BookServiceImpl bookService;
    private static final Logger logger = LoggerFactory.getLogger(CartServiceImpl.class);
    @Override
    public List<AddToCart> addCartbyUserIdAndProductId(long bookId, long userId, int qty, double price) throws Exception {
        try {
            if(addCartRepo.getCartByProductIdAnduserId(userId, bookId).isPresent()){
                throw new Exception("Product is already exist.");
            }
            AddToCart obj = new AddToCart();
            obj.setQty(qty);
            obj.setUser_id(userId);
//            Book book = bookService.findById(bookId);
            Book book = bookService.getBookById(bookId);
            obj.setBook(book);
            //TODO price has to check with qty
            obj.setPrice(price);
            addCartRepo.save(obj);
            return this.getCartByUserId(userId);
        }catch(Exception e) {
            e.printStackTrace();
            logger.error(""+e.getMessage());
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public void updateQtyByCartId(long cartId, int qty, double price) throws Exception {
        addCartRepo.updateQtyByCartId(cartId,price,qty);
    }

    @Override
    public List<AddToCart> getCartByUserId(long userId) {

        return addCartRepo.getCartByuserId(userId);
    }

    @Override
    public List<AddToCart> removeCartByUserId(long cartId, long userId) {
        addCartRepo.deleteCartByIdAndUserId(userId, cartId);
        return this.getCartByUserId(userId);
    }

    @Override
    public List<AddToCart> removeAllCartByUserId(long userId) {
        addCartRepo.deleteAllCartByUserId(userId);
        return null;
    }

    @Override
    public Boolean checkTotalAmountAgainstCart(double totalAmount, long userId) {
        double total_amount =addCartRepo.getTotalAmountByUserId(userId);
        if(total_amount == totalAmount) {
            return true;
        }
        System.out.print("Error from request "+total_amount +" --db-- "+ totalAmount);
        return false;
    }

    @Override
    public List<CheckoutCart> getAllCheckoutByUserId(long userId) {

        return checkOutRepo.getByuserId(userId);
    }

    @Override
    public List<CheckoutCart> saveProductsForCheckout(List<CheckoutCart> tmp) throws Exception {
        try {
            long user_id = tmp.get(0).getUser_id();
            if(tmp.size() >0) {
                checkOutRepo.saveAll(tmp);
                this.removeAllCartByUserId(user_id);
                return this.getAllCheckoutByUserId(user_id);
            }
            else {
                throw  new Exception("Should not be empty");
            }
        }catch(Exception e) {
            throw new Exception("Error while checkout "+e.getMessage());
        }
    }
}
