package br.com.higorcoliveira.ecommerce.config;

import br.com.higorcoliveira.ecommerce.entity.Country;
import br.com.higorcoliveira.ecommerce.entity.Product;
import br.com.higorcoliveira.ecommerce.entity.ProductCategory;
import br.com.higorcoliveira.ecommerce.entity.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class DataRestConfiguration implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public DataRestConfiguration(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        // disable methods
        configureExposition(Product.class, config);
        configureExposition(ProductCategory.class, config);
        configureExposition(ProductCategory.class, config);
        configureExposition(Country.class, config);
        configureExposition(State.class, config);

        // call a internal method to expose ids
        exposeIds(config);
    }

    private void configureExposition(Class clazz, RepositoryRestConfiguration config) {
        HttpMethod[] unsupportedActions = {HttpMethod.DELETE, HttpMethod.POST, HttpMethod.PUT};

        config.getExposureConfiguration()
                .forDomainType(clazz)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(unsupportedActions)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(unsupportedActions)));
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
        List<Class> entityClasses = new ArrayList<>();

        for (EntityType entityType : entities) {
            entityClasses.add(entityType.getJavaType());
        }
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
}
