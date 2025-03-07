package com.example.demo.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.demo.user.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

    public CustomAuthenticationFilter(AuthenticationManager authenticationManager, UserRepository userRepository ){
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        // appelé lorsque user et envoie requette de connexion
        // hna knkhrjo user mn request bosy comme getinput
        // li ktkhrj les infos dyal user mn corps dyal requette HTTP
        ObjectMapper mapper = new ObjectMapper();
        com.example.demo.user.User user = null;
        try {
            user = mapper.readValue(request.getInputStream(), com.example.demo.user.User.class);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Les infos dyal user li ghyytconnecta behom
        String name = user.getName();
        String password = user.getPassword();
        // permet de creer wahd jeton pour s'authentifier
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(name,password);
        return authenticationManager.authenticate(authenticationToken);
    }

    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        User user = (User)authentication.getPrincipal();
        //recuprew les données mn la base de données  via le nom dyal user
        com.example.demo.user.User dbUser = userRepository.findByName(user.getUsername());
        // hna kn creew payload li ghykon fih Id dyal user convertit en chaine de caractere
        Map<String, String> payload = new HashMap<>();
        payload.put("id", dbUser.getId().toString());

        Algorithm algorithm = Algorithm.HMAC256("jwt_super_secret".getBytes());
        String access_token = JWT.create()
                .withSubject(user.getUsername())
                .withPayload(payload)
                .withExpiresAt(new Date(System.currentTimeMillis() + 480 * 60 * 1000))
                .withIssuer(request.getRequestURI().toString()) // definir emmeteur de token
                .withClaim("roles", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);
        Map<String, String> token = new HashMap<>();
        token.put("access_token", access_token);
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), token);
    }
}
