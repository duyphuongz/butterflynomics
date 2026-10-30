package com.butterflynomics.infrastructure.securtity;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Component;

import com.butterflynomics.application.auth.AccessToken;
import com.butterflynomics.application.auth.TokenIssuer;
import com.butterflynomics.domain.user.User;

@Component
class JwtTokenIssuer implements TokenIssuer {
    private final JwtEncoder jwtEncoder;
    private final long expiresInSeconds;

    JwtTokenIssuer(JwtEncoder jwtEncoder, @Value("${bfn.security.jwt.expires-in-seconds}") long expiresInSeconds) {
        this.jwtEncoder = jwtEncoder;
        this.expiresInSeconds = expiresInSeconds;
    }

    @Override
    public AccessToken issue(User user) {
        Instant now = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder().issuer("butterflynomics")
                .subject(user.getId().toString())
                .claim("email", user.getEmail().value())
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiresInSeconds))
                .build();
        JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).build();

        String token = jwtEncoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
        return new AccessToken(token, expiresInSeconds);
    }

}
