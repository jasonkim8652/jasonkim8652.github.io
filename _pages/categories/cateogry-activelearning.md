---
title: "Active Learning"
layout: archive
permalink: categories/activelearning
author_profile: true
sidebar_main: true
---

{% assign posts = site.categories.activelearning %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}