package com.butterflynomics.domain.user;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.UUID;
import org.junit.jupiter.api.Test;

class UserTest {

    private static User user(UUID id, boolean active) {
        return User.restore(id, new Email("a@b.com"), new Password("hash"), active);
    }

    @Test
    void khoaTaiKhoanThiKhongDangNhapDuoc() {
        User user = user(UUID.randomUUID(), true);
        assertTrue(user.canLogin());

        user.deactivate();

        assertFalse(user.canLogin());
    }

    @Test
    void haiUserCungIdThiBangNhauDuTrangThaiKhac() {
        UUID id = UUID.randomUUID();

        assertEquals(user(id, true), user(id, false));
        assertNotEquals(user(id, true), user(UUID.randomUUID(), true));
    }

    @Test
    void khongChoPhepThieuDuLieuBatBuoc() {
        assertThrows(NullPointerException.class,
                () -> User.restore(null, new Email("a@b.com"), new Password("hash"), true));
        assertThrows(NullPointerException.class,
                () -> User.restore(UUID.randomUUID(), null, new Password("hash"), true));
    }

    @Test
    void toStringKhongLoPasswordHash() {
        assertFalse(user(UUID.randomUUID(), true).toString().contains("hash"));
    }
}