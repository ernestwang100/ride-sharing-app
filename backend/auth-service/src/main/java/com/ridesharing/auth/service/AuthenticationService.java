package com.ridesharing.auth.service;

import com.ridesharing.auth.controller.AuthenticationRequest;
import com.ridesharing.auth.controller.AuthenticationResponse;
import com.ridesharing.auth.controller.RegisterRequest;
import com.ridesharing.auth.model.User;
import com.ridesharing.auth.repository.UserRepository;
import com.ridesharing.auth.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
        private final UserRepository repository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;

        public AuthenticationResponse register(RegisterRequest request) {
                if (repository.existsByEmail(request.getEmail())) {
                        throw new RuntimeException("Email already taken");
                }
                var user = User.builder()
                                .name(request.getName())
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .role(request.getRole())
                                .build();
                repository.save(user);

                // Use a UserDetails adapter for token generation
                var userDetails = org.springframework.security.core.userdetails.User.builder()
                                .username(user.getEmail())
                                .password(user.getPassword())
                                .roles(user.getRole().name())
                                .build();

                var jwtToken = jwtService.generateToken(userDetails);
                return AuthenticationResponse.builder()
                                .token(jwtToken)
                                .role(user.getRole().name())
                                .userId(user.getId())
                                .build();
        }

        public AuthenticationResponse authenticate(AuthenticationRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getEmail(),
                                                request.getPassword()));
                var user = repository.findByEmail(request.getEmail())
                                .orElseThrow();

                var userDetails = org.springframework.security.core.userdetails.User.builder()
                                .username(user.getEmail())
                                .password(user.getPassword())
                                .roles(user.getRole().name())
                                .build();

                var jwtToken = jwtService.generateToken(userDetails);
                return AuthenticationResponse.builder()
                                .token(jwtToken)
                                .role(user.getRole().name())
                                .userId(user.getId())
                                .build();
        }
}
