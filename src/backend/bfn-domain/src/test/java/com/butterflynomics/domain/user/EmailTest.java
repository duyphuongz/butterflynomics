package com.butterflynomics.domain.user;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

class EmailTest {

    @Test
    void chuanHoaThanhChuThuongVaCatKhoangTrang() {
        assertEquals("a@b.com", new Email("  A@B.com ").value());
    }

    @Test
    void emailSaiDinhDangBiTuChoi() {
        assertThrows(InvalidEmailException.class, () -> new Email("khong-co-a-cong"));
        assertThrows(InvalidEmailException.class, () -> new Email("a@b"));
        assertThrows(InvalidEmailException.class, () -> new Email(""));
        assertThrows(InvalidEmailException.class, () -> new Email(null));
    }
}