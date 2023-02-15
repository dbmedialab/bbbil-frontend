<div align="center">
    <h1>front-template</h1>
    <p>Template for building Next app</p>
    <img src="https://inma.no/wp-content/uploads/2016/12/aller.png" />
    <p><i>Feel free to add a logo</i></p>
</div>

> Text marked in quote-blocks should be replaced by you after creating your project, *especially "**template-frontend-nextjs**"*

## Description
> Your app should have a description

## Requirements
Node: 16.14.0


## Setup
In github, at the top of this repository you find a green `Use this template` button that
you can use to quickly setup a new repository based on this one.

Then you clone your new repository to your local development machine.
```
git clone git@github.com:dbmedialab/<repository-name> [optional-project-name]
```

Next you should ensure you are using a supported node version, the `.nvmrc` file makes this
easy for you if you have `NVM` installed. Or if you need to install it manually or you are
using `n` you can look inside the `.nvmrc` file to find the recommended node version
```
cd <repository-name>

nvm use
```

Now you will need to install the dependencies
```
yarn
```

## Run
> Explain how to run the app
> 
> Example: `yarn dev`
>
> And other relevant commands such as
>
> `yarn test:jest`
>
> `yarn test:e2e`

## Ingress

To make the app publicly available, first **consider if this is really needed.**
It greatly increases the number of attack vectors available to "malicious
entities" on the web, and is very rarely something you need. All of our apps
are routed through varnish, which is perfectly happy with an internal
(rfc1918) address.

To reach internal addresses from your workstation, please have a look at
[sshuttle in the wiki](https://wiki.medialaben.no/tools/sshuttle.md), and
maybe you don't need external access.

**If it is necessary** to expose your service to the outside world, rename the
files `ingressRoute-http.yml.disabled` and `ingressRoute-https.yml.disabled` and
`service-ClusterIP.yml.disabled` to activate them. This will make your app
reachable (some 5 minutes after deploy) on:

```
https://{reponame}.prod.medialaben.no
https://{reponame}.stage.medialaben.no
https://{reponame}.test.medialaben.no
```

## Tracking

If you want to use tracking, you have two available options:

1. **Default trackers:**
    To use the set of default trackers, it is just needed to import and call the `useInitTracker` from `useTracker` inside your functional component.
    ```ts
    import { useInitTracking } from '../utils/useTracker'

    export default function Home() {
        useInitTracking()
        return (
            <>
                <Title>My page</Title>
                <Counter />
            </>
        )
    }
    ```

2. **Custom trackers:**
    To use a single tracker or a custom set of them, it is needed to import the `useTracker` instead of the `useInitTracker`, destructure the `tracker` and call the desired trackers inside of a useEffect.
    ```ts
    import { useTracker } from '../utils/useTracker'

    export default function Home() {
        const { tracker } = useTracker()
        useEffect(() => {
            tracker?.trackPageload()
            tracker?.trackArticleImpressions(selector)
        }, [])
        return (
            <>
                <Title>My page</Title>
                <Counter />
            </>
        )
    }
    ```
