#!/bin/bash

# Generate a unique timestamp ID for this version of the VCL
TIME=$(date +%s)

# Load the file into memory
varnishadm vcl.load varnish_$TIME /etc/varnish/default.vcl

# Active this Varnish config
varnishadm vcl.use varnish_$TIME
