package com.speakmast.backend.security;

import com.speakmast.backend.annotations.IsCourseOwner;
import com.speakmast.backend.annotations.IsStudent;
import com.speakmast.backend.annotations.IsTeacher;
import com.speakmast.backend.services.security.ISecurityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.servlet.resource.ResourceHttpRequestHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Component
public class AuthorityInterceptor implements HandlerInterceptor {
    private final ISecurityService securityService;
    private final Logger logger = LoggerFactory.getLogger(AuthorityInterceptor.class);

    @Autowired
    public AuthorityInterceptor(ISecurityService securityService) {
        this.securityService = securityService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if(!Boolean.valueOf(request.getHeader("isAuthRequired"))){
            return true;
        }
        else {
            if (handler instanceof ResourceHttpRequestHandler) {
                return true;
            }

            HandlerMethod handlerMethod = (HandlerMethod) handler;
            IsTeacher isTeacher = handlerMethod.getMethodAnnotation(IsTeacher.class);
            IsCourseOwner isCourseOwner = handlerMethod.getMethodAnnotation(IsCourseOwner.class);
            IsStudent isStudent = handlerMethod.getMethodAnnotation(IsStudent.class);

            if (isTeacher != null) {
                if (securityService.isTeacher())
                    return true;
            }

            if (isStudent != null) {
                if (securityService.isStudent())
                    return true;
            }

            /* Get a map of request attributes. */
            Map<String, String> attributes =
                    (Map<String, String>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
            //
            //        if (isCourseOwner != null) {
            //            logger.info("picked up an isCourseOwner.");
            //            int courseId = Integer.parseInt(attributes.get(isCourseOwner.pathVariable()));
            //            logger.info("knows that the course it has been called upon is courseId={}.", courseId);
            //
            //            if (securityService.isCourseOwner(courseId)) {
            //                return true;
            //            } else {
            //                response.setStatus(HttpStatus.FORBIDDEN.value());
            //                return false;
            //            }
            //        }

            return true;
        }
    }
}
