package co.edu.cue.proyectonuclear.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.function.Function;
@Component
public class JwtUtil {


    @Value("${jwt.secret.key}")
    private String secretKey;


    //Generar token de acceso
    public String generateAccessToken(String username){
        return Jwts.builder()
                .setSubject(username)
                .signWith(getSignatureKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Validar token de acceso
    public boolean isTokenValid(String token){
        try{
            Jwts.parserBuilder()
                    .setSigningKey(getSignatureKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return true;

        }catch (Exception e){
            System.out.println(e.getMessage());
            return false;
        }
    }

    //Obtener usename del token
    public String gerUsernameFromToken(String token){
        return geClaim(token,Claims::getSubject);
    }

    //Obtener un solo claim
    public <T> T geClaim(String token , Function<Claims,T> claimsTFunction){
        Claims  claims = extractAllClaims(token);
        return  claimsTFunction.apply(claims);
    }

    // Obtener claims del token
    public Claims extractAllClaims(String token){
        return   Jwts.parserBuilder()
                .setSigningKey(getSignatureKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    //Obtener firma del token
    public Key getSignatureKey(){
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
