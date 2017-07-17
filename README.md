FilterParams.js
===

usage: 

```javascript

  const attrs = {
    user_id: "xxx",
    email: "xxx@email.com",
    name: null,
    isValid: false,
  }

  const filter = new FilterParams(attrs)
```


# Require an attribute

```javascript
  filter.req([ "name" ])
  // raise Error `name is required`
```

# Filtering attributes

## exclude attrbutes
```javascript
  filter.exclude([ "name" ]).commit()
  /* {
    user_id: "xxx",
    email: "xxx@email.com",
    isValid: false,
  } */
```
## permit attributes
```javascript
  filter.permit([ "email" ]).commit()
  /* {
    email: "xxx@email.com",
  } */
```
