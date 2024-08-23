# FusionAuth + Node
<div style="font-size:10pt;margin-top:-12px;margin-bottom:24px;font-style:italic">
a simple tutorial
</div>

I found this tutorial from Feb 2019 in the fusionauth [blog]. It seemed so simple but had a few gotchas so, I've updated it to work with the latest version of FusionAuth.

```bash
cd ~
mkdir tutorial
cd tutorial
yarn init -y
yarn add express @fusionauth/typescript-client
touch test.js

```

<!-- cloaking mode -->
[blog]: https://fusionauth.io/blog/easy-integration-fusionauth-nodejs