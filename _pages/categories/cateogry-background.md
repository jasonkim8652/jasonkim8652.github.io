---
title: "Background techniques"
layout: archive
permalink: categories/background
author_profile: true
sidebar_main: true
---

{% assign posts = site.categories.background %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}